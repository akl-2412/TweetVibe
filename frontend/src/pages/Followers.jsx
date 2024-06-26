import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "../components/SuggestedUser";
import useShowToast from "../hooks/useShowToast";

const Followers = () => {
	const [loading, setLoading] = useState(true);
	const [followedUsers, setFollowedUsers] = useState([]);
	const showToast = useShowToast();

	useEffect(() => {
		const getFollowedUsers = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users/followers");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setFollowedUsers(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};

		getFollowedUsers();
	}, [showToast]);

	return (
		<div className="ml-10 mr-10">
			<Text mb={4} fontWeight={"bold"}>
				Followed Users
			</Text>
			<Flex direction={"column"} gap={4}>
				{!loading && followedUsers.map((user) => <SuggestedUser key={user._id} user={user} />)}
				{loading &&
					[0, 1, 2, 3, 4].map((_, idx) => (
						<Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
							{/* avatar skeleton */}
							<Box>
								<SkeletonCircle size={"10"} />
							</Box>
							{/* username and fullname skeleton */}
							<Flex w={"full"} flexDirection={"column"} gap={2}>
								<Skeleton h={"8px"} w={"80px"} />
								<Skeleton h={"8px"} w={"90px"} />
							</Flex>
							{/* follow button skeleton */}
							<Flex>
								<Skeleton h={"20px"} w={"60px"} />
							</Flex>
						</Flex>
					))}
			</Flex>
		</div>
	);
};

export default Followers;