import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Flex,
	Grid,
	GridItem,
	HStack,
	Heading,
	IconButton,
	Image,
	Link,
	Select,
	Text,
	Textarea
} from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { RiBookMarkFill } from "react-icons/ri";
import { Link as routerLink, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/auths";
import { UserContext, UserDispatchContext } from "../../lib/context";
import { db } from "../../lib/firebase";
import { ROOT } from "../../lib/routes";
import Navbar from "./Navbar";

export default function CurrentPost() {
	const { postId } = useParams();
	const [currentPost, setCurrentPost] = useState([]);
	const [desc, setDesc] = useState("");
	const userDetails = useContext(UserContext);
	const setUserDetails = useContext(UserDispatchContext);
	useEffect(() => {
		onSnapshot(doc(db, "posts", postId), (snapshot) => {
			setCurrentPost({ ...snapshot.data(), id: snapshot.id });
			setDesc(snapshot.data().desc);
			let details = {
				...userDetails,
				history: [
					...userDetails.history,
					{ ...snapshot.data(), id: snapshot.id },
				],
			};
			setUserDetails({ ...details });
		});
	}, []);

	const handleBookmark = () => {
		let details = {
			...userDetails,
			bookmark: [...userDetails.bookmark, currentPost],
		};

		console.log(details);
		setUserDetails({ ...details });
		console.log("user details ", userDetails);
	};

	let data = [
		{
			authorName: "Abhishek",
			comment: "This is an example comment.",
		},
		{
			authorName: "Emily",
			comment: "I really enjoyed reading this article!",
		},
		{
			authorName: "John",
			comment: "Could you please provide more details about this topic?",
		},
		{
			authorName: "Sarah",
			comment: "I disagree with the points made in this post.",
		},
		{
			authorName: "Michael",
			comment: "Great job! Looking forward to more content from you.",
		},
	];
	const [comments, setComments] = useState(data);
	const [input, setInput] = useState("");
	const { user, isLoading: authLoading } = useAuth();
	console.log(user);
	console.log(currentPost);
	const selectChangeHandler = (e) => {
		let value = e.target.value;
		let temp = { ...userDetails };
		temp.lists.forEach((list) => {
			if (list.name === e.target.value) {
				list.posts.push(currentPost);
			}

			if (
				list.posts.filter((post) => post.id === currentPost.id).length >
					0 &&
				list.name != value
			) {
				list.posts = list.posts.filter(
					(post) => post.id !== currentPost.id
				);
			}
		});
		setUserDetails(temp);
		console.log(userDetails);
	};
	return (
		<>
			<Navbar />
			<motion.div layout>
				<Container maxW={"7xl"} p="12">
					<motion.button
						whileHover={{
							scale: 1.2,
							transition: { duration: 1 },
						}}
						whileTap={{ scale: 0.9 }}
					>
						<IconButton
							colorScheme="#319594"
							as={routerLink}
							to={ROOT}
							size="lg"
							icon={<AiOutlineRollback />}
							isRound
							variant="ghost"
						/>
					</motion.button>
					<HStack>
						<Heading as="h2">{currentPost.title}</Heading>
						<IconButton
							onClick={handleBookmark}
							ml={5}
							fontSize="30px"
							icon={<RiBookMarkFill />}
						></IconButton>

						<Select width="20%" onChange={selectChangeHandler} placeholder="select list">
							{userDetails.lists.map((list) => (
								<option value={list.name}>{list.name}</option>
							))}
						</Select>
					</HStack>
					<Divider marginTop="5" />
					<Grid
						templateColumns="repeat(auto-fill, minmax(100%, 1fr))"
						gap={6}
						marginTop="5"
					>
						<GridItem>
							<Box w="100%">
								<Box borderRadius="lg" overflow="hidden">
									<Link
										textDecoration="none"
										_hover={{ textDecoration: "none" }}
									>
										<Image
											transform="scale(1.0)"
											src={currentPost.imageUrl}
											alt="blog image here"
											width="100%"
											height={"60vh"}
											objectFit="cover"
											transition="0.3s ease-in-out"
											_hover={{
												transform: "scale(1.05)",
											}}
										/>
									</Link>
								</Box>
								{currentPost?.uid !== user?.id ? (
									<Text> {currentPost.desc}</Text>
								) : (
									<Textarea
										mt={2}
										value={desc}
										onChange={(e) =>
											setDesc(e.target.value)
										}
									></Textarea>
								)}
							</Box>

							<Heading mt={10} size="md">
								Comments
							</Heading>
							<Textarea
								placeholder="Add comment"
								value={input}
								onChange={(e) => setInput(e.target.value)}
							></Textarea>
							<Button
								mt={1}
								mb={5}
								colorScheme="blue"
								onClick={() => {
									setComments([
										...comments,
										{
											authorName: "User 123",
											comment: input,
										},
									]);
									setInput("");
								}}
							>
								Add comment
							</Button>
							<Flex direction="column" gap={2}>
								{comments.map((comment) => (
									<Flex
										alignItems="center"
										_hover={{ bg: "lightgray" }}
										padding={5}
									>
										<Avatar
											size="md"
											name={comment.authorName}
											mr={5}
										></Avatar>
										<Text>{comment.comment}</Text>
									</Flex>
								))}
							</Flex>
						</GridItem>
					</Grid>
				</Container>
			</motion.div>
		</>
	);
}
