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
} from "@chakra-ui/react";
import { Link as routerLink } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { motion, LayoutGroup } from "framer-motion";
import React from "react";
import { usePosts } from "../../hooks/posts";
import SinglePost from "../posts/SinglePost";
import { useUser } from "../../hooks/user";
import { useState } from "react";
import { useDebounce } from "../../hooks/posts";
import { multiFactor } from "firebase/auth";

const SearchModalContent = ({ queryResult, searchQuery }) => {
	console.log(queryResult);
	return (
		<VStack width="100%" alignItems="flex-start">
			{queryResult && Array.isArray(queryResult)
				? queryResult.map((e) => (
						<Box
							width="100%"
							_hover={{ bg: "lightGray" }}
							key={e.desc}
							py={2}
							px={5}
							rounded={5}
							// onClick={() =>
							// 	router.push(
							// 		`/dashboard/home/${e.meetingData._id}`
							// 	)
							// }
						>
							<Flex
								direction="column"
								width="100%"
								alignItems="flex-start"
							>
								<Link
									textDecoration="none"
									_hover={{ textDecoration: "none" }}
									as={routerLink}
									to={`/posts/${e?.id}`}
								>
									<Heading size="sm"> {e.title}</Heading>
								</Link>
								<span>{e.desc}</span>
								{/* <Flex
									direction="row"
									width="100%"
									justifyContent="space-between"
								>
									{e.meetingData.meetingName ? (
										<Heading size="sm">
											e.meetingData.meetingName
										</Heading>
									) : (
										<Heading size="sm">
											Meeting Name
										</Heading>
									)}

									<Text fontSize={{ md: "11px", lg: "13px" }}>
										{new Date(
											e.meetingData.startTime
										).toLocaleDateString()}
									</Text>
								</Flex>
								<Box color="gray" width="100%">
									{e.index != -1 ? (
										<Text>
											{e.data.text.slice(0, e.index)}
											<span
												style={{ background: "yellow" }}
											>
												{e.data.text.slice(
													e.index,
													e.index + searchQuery.length
												)}
											</span>
											{e.data.text.slice(
												e.index + searchQuery.length,
												e.data.text.length
											)}
										</Text>
									) : (
										<Flex
											width="100%"
											alignItems="baseline"
											justifyContent="space-between"
										>
											<Text>{e.data.text}</Text>
											<Text
												fontSize={{
													md: "11px",
													lg: "13px",
												}}
												color="black"
												bg="lightpink"
												rounded={3}
												px={1}
											>
												{" "}
												Speaker : {e.data.speaker}
											</Text>
										</Flex>
									)}
								</Box> */}
							</Flex>
						</Box>
				  ))
				: null}
		</VStack>
	);
};

const SearchBarModal = ({ isOpen, onClose, meetData }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const queryResult = useDebounce(searchQuery, meetData, 500);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent minW="40vw" maxH="70vh" overflowY="scroll">
					<ModalBody>
						<VStack>
							<InputGroup>
								<InputLeftElement
									minH="6vh"
									fontSize="28px"
									color="brand.800"
									pointerEvents="none"
								>
									<SearchIcon color="gray.300" />
								</InputLeftElement>

								<Input
									minH="6vh"
									variant="flushed"
									focusBorderColor="brand.700"
									fontSize="28px"
									type="text"
									placeholder="Search"
									onChange={(e) => {
										setSearchQuery(e.target.value);
									}}
								/>
							</InputGroup>

							<SearchModalContent
								queryResult={queryResult}
								searchQuery={searchQuery}
							/>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
export default function PostList() {
	const { posts, isLoading } = usePosts();

	const data = posts;
	console.log(data);
	const { isOpen, onOpen, onClose } = useDisclosure();
	let topPost = data
		?.sort((a, b) => parseInt(b.likes.length) - parseInt(a.likes.length))
		.slice(0, 5);
	// const {user, isLoading: userLoading} = useUser();
	if (isLoading)
		return (
			<Box pos="absolute" top="50%" left="50%">
				<Spinner size="xl" />
			</Box>
		);

	return (
		<Container maxW={"7xl"} p="12">
			<Heading> Search </Heading>
			{isOpen && (
				<SearchBarModal
					isOpen={isOpen}
					onClose={onClose}
					meetData={data}
				/>
			)}
			<InputGroup size="md" width="60%" mb="2%" mt="2%">
				<InputLeftElement pointerEvents="none">
					<Icon as={SearchIcon}></Icon>
				</InputLeftElement>
				<Input
					type="text"
					placeholder="Search for Blogs"
					border="1px solid lightGray"
					borderRadius={10}
					onClick={onOpen}
					_focus={{ borderColor: "brand.800" }}
					_active={{ borderColor: "brand.800" }}
					_selected={{ borderColor: "brand.800" }}
				/>
			</InputGroup>
			<Heading> Top Posts</Heading>
			<Grid
				templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
				gap={6}
				marginTop="5"
			>
				{topPost.map((post) => (
					<GridItem key={post.id}>
						<motion.div layout>
							<SinglePost post={post} />
						</motion.div>
					</GridItem>
				))}
			</Grid>
			<Heading as="h2" marginTop="5">
				Latest articles
			</Heading>
			<Divider marginTop="5" />
			<Grid
				templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
				gap={6}
				marginTop="5"
			>
				{posts.map((post) => (
					<GridItem key={post.id}>
						<motion.div layout>
							<SinglePost post={post} />
						</motion.div>
					</GridItem>
				))}
			</Grid>
		</Container>
	);
}
