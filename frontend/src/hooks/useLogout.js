import userAtom from "../atoms/userAtom";
import { useSetRecoilState ,useRecoilState} from "recoil";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom";
import { selectedConversationAtom } from "../atoms/messagesAtom";

const useLogout = () => {
	const setUser = useSetRecoilState(userAtom);
	const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
	const showToast = useShowToast();
	const navigate = useNavigate();
	const logout = async () => {
		try {
			const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

			localStorage.removeItem("user-threads");
			setUser(null);
			setSelectedConversation(
				{
					_id: "",
					userId: "",
					username: "",
					userProfilePic: "",
				}
			);
			navigate("/auth");
		} catch (error) {
			showToast("Error", error, "error");
		}
	};

	return logout;
};

export default useLogout;