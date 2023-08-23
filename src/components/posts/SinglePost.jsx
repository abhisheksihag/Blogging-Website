import React from "react";
import {
	Box,
	Heading,
	Link,
	Image,
	Text,
	Avatar,
	Flex,
	IconButton,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/auths";
import { formatDistanceToNow } from "date-fns";
import { AiTwotoneHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import { useDeletePost, useToggleLike } from "../../hooks/posts";
import { Link as routerLink } from "react-router-dom";
import { useUser } from "../../hooks/user";
import { FaClock, FaShare } from "react-icons/fa";
import {db} from "../../lib/firebase";

const SinglePost = ({ post }) => {
	const { user, isLoading: authLoading } = useAuth();
	const { id, likes, uid } = post;
	const isLiked = likes.includes(user?.id);
	const { toggleLike, isLoading } = useToggleLike({
		id,
		isLiked,
		uid: user?.id,
	});
	const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
	const { user: users, isLoading: userLoading } = useUser(uid);

// 	const handleShare = async () => {
//     // Create a new Firestore document for sharing
//     const shareRef = db.collection('shares').doc();
    
//     // Set data in the share document
//     await shareRef.set({
//       id,
//       sharedAt: new Date(),
//     });

//     // Generate a share URL
//     const shareUrl = `${window.location.origin}/shared/${shareRef.id}`;
//     alert(`Share this link: ${shareUrl}`);
//   };

	return (
		<>
			<Box w="100%" key={post.id}>
				<Box borderRadius="lg" overflow="hidden">
					<Link
						textDecoration="none"
						_hover={{ textDecoration: "none" }}
					>
						<Image
							transform="scale(1.0)"
							src={post.imageUrl}
							alt="some text"
							width="100%"
							objectFit="cover"
							height={"400px"}
							transition="0.3s ease-in-out"
							_hover={{
								transform: "scale(1.05)",
							}}
						/>
					</Link>
				</Box>
				<Heading fontSize="xl" marginTop="2">
					<Link
						textDecoration="none"
						_hover={{ textDecoration: "none" }}
						as={routerLink}
						to={`/posts/${post?.id}`}
					>
						{post.title}
					</Link>
				</Heading>
				<Text as="p" fontSize="md" marginTop="2">
					{post.desc.substring(0, 150)}...
				</Text>
				<Box mt={"10px"}>
					<Flex align={"center"}>
						<Link
							textDecoration="none"
							_hover={{ textDecoration: "none" }}
							as={routerLink}
							to={`/profile/${post?.id}`}
						>
							<Avatar name={users?.username} size={"sm"} />
						</Link>

						<Text casing={"capitalize"}>
							<span style={{ paddingLeft: "10px" }}>
								{formatDistanceToNow(post.date)} ago
							</span>
						</Text>
						<IconButton
							colorScheme="red"
							onClick={toggleLike}
							isLoading={authLoading || isLoading}
							size="md"
							icon={
								isLiked ? (
									<AiTwotoneHeart />
								) : (
									<AiOutlineHeart />
								)
							}
							isRound
							variant="ghost"
						/>
						<Text> {likes.length}</Text>
						<IconButton
							colorScheme="red"
							onClick={toggleLike}
							isLoading={authLoading || isLoading}
							size="md"
							icon={<FaClock />}
							isRound
							variant="ghost"
						/>
						<Text> {Math.floor(post.desc.length * 0.1)} </Text>

						{!authLoading && user?.id === uid && (
							<>
								<IconButton
									colorScheme="red"
									size="lg"
									icon={<AiFillDelete />}
									isRound
									onClick={deletePost}
									isLoading={deleteLoading}
									variant="ghost"
								/>
							</>
						)}

						
						<Link href="https://web.whatsapp.com/">
						<IconButton
							colorScheme="red"
							size="lg"
							icon={<FaShare />}
							isRound
							variant="ghost" 
						/>
						</Link>
					</Flex>
				</Box>
			</Box>
		</>
	);
};

export default SinglePost;
