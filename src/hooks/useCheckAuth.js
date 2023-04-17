import { useEffect } from "react";
import { useDispatch, useSelelector } from "react-redux";
import { onAuthStateChanged } from "../firebase/auth";

import { FirebaseAuth } from "../firebase/config";
import { login , logout } from '../store/auth';