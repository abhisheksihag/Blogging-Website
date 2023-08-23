import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	GridItem,
	HStack,
	Heading,
	Input,
	Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../../hooks/auths";
import { usePosts } from "../../hooks/posts";
import { UserContext, UserDispatchContext } from "../../lib/context";
import { auth } from "../../lib/firebase";
import SinglePost from "../posts/SinglePost";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Profile() {
	const { posts, isLoading } = usePosts();
	const [authUser, authL, error] = useAuthState(auth);
	const { user, isLoading: authLoading } = useAuth();

	let myPosts = posts?.filter((post) => post.uid === user?.id);
	const userDetails = useContext(UserContext);
	const setUserDetails = useContext(UserDispatchContext);
	let draftPosts = userDetails.draft;
	let savedPosts = userDetails.bookmark;
	let history = userDetails.history;
	console.log("user details", userDetails);
	console.log("Draft Posts", draftPosts);
	console.log("Saved Posts", savedPosts);
	const [input, setInput] = useState("");
	// useEffect(() => {
	// 	draftPosts = userDetails.draft;
	// 	console.log("Draft Posts", draftPosts);
	// }, [userDetails, setUserDetails]);
	console.log(user);
	console.log(posts);

	const addListHandler = () => {
		let temp = { ...userDetails };
		temp.lists.push({ name: input, posts: [] });
		
		setUserDetails(temp);
		setInput("");
		console.log(userDetails);
	};

	if (isLoading)
		return (
			<Box pos="absolute" top="50%" left="50%">
				<Spinner size="xl" />
			</Box>
		);
	return (
		<div>
			<Navbar />
			<Container maxW={"7xl"} p="12">
				<Heading>Profile </Heading>
				<HStack mt={10}>
					<Avatar name={user?.username}></Avatar>
					<Heading size="md" ml={10}>
						{user?.username} |
					</Heading>
					<Heading size="md" ml={10}>
						Email : {authUser.email}
					</Heading>
				</HStack>
				<Heading as="h2" marginTop="10" mb={10}>
					My Lists
				</Heading>
				<Input
					value={input}
					mb={2}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Add list name"
				></Input>
				<Button onClick={addListHandler}> Add </Button>
				{userDetails.lists.map((list) => (
					<>
						<HStack key={list.name} mt={10} >
							<Heading size="md" ml={10}>
								{list.name} |
							</Heading>
							<Heading size="md" ml={10}>
								{list.posts.length} posts
							</Heading>
						</HStack>
						<Grid
							templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
							gap={6}
							marginTop="5"
						>
							{list.posts?.map((post) => (
								<GridItem key={post.id}>
									<motion.div layout>
										<SinglePost post={post} />
									</motion.div>
								</GridItem>
							))}
						</Grid>
					</>
				))}
				<Heading as="h2" marginTop="10">
					My Articles
				</Heading>
				<Divider marginTop="5" />
				<Grid
					templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
					gap={6}
					marginTop="5"
				>
					{myPosts.map((post) => (
						<GridItem key={post.id}>
							<motion.div layout>
								<SinglePost post={post} />
							</motion.div>
						</GridItem>
					))}
				</Grid>
				<Heading as="h2" marginTop="10">
					Drafts
				</Heading>
				<Divider marginTop="5" />
				<Grid
					templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
					gap={6}
					marginTop="5"
				>
					{draftPosts.map((post) => (
						<GridItem key={post.id}>
							<motion.div layout>
								<SinglePost post={post} />
							</motion.div>
						</GridItem>
					))}
				</Grid>
				<Heading as="h2" marginTop="10">
					Saved Articles
				</Heading>
				<Divider marginTop="5" />
				<Grid
					templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
					gap={6}
					marginTop="5"
				>
					{savedPosts.map((post) => (
						<GridItem key={post.id}>
							<motion.div layout>
								<SinglePost post={post} />
							</motion.div>
						</GridItem>
					))}
				</Grid>
				<Heading as="h2" marginTop="10">
					History
				</Heading>
				<Divider marginTop="5" />
				<Grid
					templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
					gap={6}
					marginTop="5"
				>
					{history.map((post) => (
						<GridItem key={post.id}>
							<motion.div layout>
								<SinglePost post={post} />
							</motion.div>
						</GridItem>
					))}
				</Grid>
				<Footer />
			</Container>
		</div>
	);
}
