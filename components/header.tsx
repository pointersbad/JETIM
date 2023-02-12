import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface IProps {
	links: Record<string, string>;
}

const Header = (props: IProps) => {
	const router = useRouter();
	return (
		<AppBar position="fixed" color="transparent" sx={{ boxShadow: 'none' }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography variant="h6" noWrap component="a" href="/">
						<img src="/logo.png" height={36} />
					</Typography>
					<Box sx={{ flexGrow: 1, display: 'flex' }}>
						{Object.entries(props.links).map(([label, link]) => (
							<Button onClick={() => router.push(link)} key={link} color="white">
								{label}
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
