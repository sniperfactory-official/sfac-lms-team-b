import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "@utils/firebase";

const getSubmittedAssignments = () => {};

const useGetSubmittedAssignments = () => {};
