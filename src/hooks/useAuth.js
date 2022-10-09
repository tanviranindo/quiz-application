import { getAuth } from "firebase/auth";

export default function useAuth() {
    return getAuth();
}