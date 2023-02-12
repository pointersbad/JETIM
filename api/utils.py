from dotenv import load_dotenv
from pexelsapi.pexels import Pexels
from shotstack_sdk.model.image_asset import ImageAsset
from shotstack_sdk.api import edit_api
from shotstack_sdk.model.clip import Clip
from shotstack_sdk.model.track import Track
from shotstack_sdk.model.timeline import Timeline
from shotstack_sdk.model.output import Output
from shotstack_sdk.model.edit import Edit
from shotstack_sdk.model.title_asset import TitleAsset
from shotstack_sdk.model.video_asset import VideoAsset
from shotstack_sdk.model.soundtrack import Soundtrack
from shotstack_sdk.model.transition import Transition

import shotstack_sdk as shotstack
import os
import openai

load_dotenv()

shotstack_url = os.getenv("SHOTSTACK_HOST")
shotstack_api_key = os.getenv("SHOTSTACK_API_KEY")
shotstack_assets_url = os.getenv("SHOTSTACK_ASSETS_URL")
pexels_api_key = os.getenv("PEXELS_API_KEY")
openai_api_key = os.getenv("OPENAI_API_KEY")

api = Pexels(pexels_api_key)

configuration = shotstack.Configuration(host=shotstack_url)
configuration.api_key['DeveloperKey'] = shotstack_api_key

# Define OpenAI API key 
openai.api_key = openai_api_key

# Ghatgpt
def sendprompt(prompt):
    # Set up the model and prompt
    model_engine = "text-davinci-003"

    # Generate a response
    completion = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )

    response = completion.choices[0].text


def request(data):
    min_clips = 6.0
    max_clips = 20.0
    clip_duration = 4.0
    start_video = 2.0

    search_videos = api.search_videos(
        query=data.get("search"), page=1, per_page=max_clips)

    with shotstack.ApiClient(configuration) as api_client:
        api_instance = edit_api.EditApi(api_client)
        video_clips = []

        title_asset = TitleAsset(
            text=data.get('title'),
            style="minimal",
            size="medium"
        )

        title_trans = Transition(
            _in="circle",
            out="star"
        )

        title_clip = Clip(
            asset=title_asset,
            length=start_video,
            start=0.0,
            transition=title_trans,
            effect="zoomIn"
        )

        text_speech = sendprompt(data)


        for i, video in enumerate(search_videos.get('videos')):
            if i >= max_clips:
                break

            header_file = None
            videos = video.get('video_files')

            for entry in videos:
                if entry.get('height') == 720 or entry.get('width') == 1920:
                    header_file = entry

            if header_file is None:
                header_file = videos[0]

            video_asset = VideoAsset(
                src=header_file.get('link'),
                trim=2.0
            )

            video_clip = Clip(
                asset=video_asset,
                start=start_video + (i * clip_duration),
                length=clip_duration
            )

            video_clips.append(video_clip)

            title_trans = Transition(
                _in="circle",
                out="star"
            )

        edit = Edit(
            timeline=Timeline(
                background="#000000",
                soundtrack=Soundtrack(
                    src=f"{shotstack_assets_url}music/{data.get('soundtrack')}.mp3",
                    effect="fadeOut"
                ),
                tracks=[Track(clips=[title_clip]), Track(clips=video_clips)]
            )
            output=Output(
                format="mp4",
                resolution="sd"
            )
        )

        return api_instance.post_render(edit)['response']


def status(id):
    with shotstack.ApiClient(configuration) as api_client:
        api_instance = edit_api.EditApi(api_client)
        return api_instance.get_render(id, data=True, merged=True)['response']
