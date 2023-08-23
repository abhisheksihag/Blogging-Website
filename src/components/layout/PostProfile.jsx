import {
	Box,
	Container,
	Divider,
	Grid,
	GridItem,
	Heading,
	Spinner,
	Text,
	Wrap,
	WrapItem,
	useDisclosure,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	VStack,
	Input,
	InputGroup,
	InputLeftElement,
	Flex,
	IconButton,
	useColorModeValue,
	useColorMode,
	Icon,
	Link,
	Avatar,
	HStack,
} from "@chakra-ui/react";
import { Link as routerLink, useParams } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { motion, LayoutGroup } from "framer-motion";
import React from "react";
import { usePosts } from "../../hooks/posts";
import SinglePost from "../posts/SinglePost";
import { useUser } from "../../hooks/user";
import { useState } from "react";
import { useDebounce } from "../../hooks/posts";
import { multiFactor } from "firebase/auth";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../../hooks/auths";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "../../lib/firebase";
import { Button } from "react-bootstrap";
import FollowButton from './FollowButton';

export default function PostProfile() {
	const { postId } = useParams();
	const { posts, isLoading } = usePosts();


    const authorId= posts?.filter((post) => post?.id === postId);
    console.log("author",authorId)

	 const { user: users, isLoading: userLoading } = useUser(authorId?authorId[0].uid:"vlqDNZralDaXUfLToPpPjGJErJa2");

	let myPosts = posts?.filter((post) => post.id === postId);
   console.log("users: ", users)
	console.log(postId);
	console.log(posts);

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
					<Avatar name={users?.username}></Avatar>
					<Heading size="md" ml={10}>
						{users?.username} 
					</Heading>

					<FollowButton authorId={authorId} />
					
				</HStack>

				<Heading as="h2" marginTop="10">
					 Articles
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
				<Footer />
			</Container>
		</div>
	);
}
