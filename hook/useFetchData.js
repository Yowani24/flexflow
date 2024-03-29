import axios from "axios";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { db } from "../src/firebase";

const api_url = "http://localhost:3001";

const allClients = [
  {
    id: 1,
    name: "Chevron",
    cnpj: "33.337.122/0001-27",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Chevron_Logo.svg/1836px-Chevron_Logo.svg.png",
    daedline: 30,
  },
  {
    id: 2,
    name: "Maersk",
    cnpj: "30.259.220/0002-86",
    logo: "https://i.pinimg.com/originals/b0/8c/ca/b08cca4d6dc653cbfe0ae419101a1bee.png",
    daedline: 24,
  },
  {
    id: 3,
    name: "Google",
    cnpj: "06.947.284/0001-04",
    logo: "https://logopng.com.br/logos/google-37.png",
    daedline: 28,
  },
  {
    id: 4,
    name: "TotalEnergies",
    cnpj: "08.976.181/0001-06",
    logo: "https://logodownload.org/wp-content/uploads/2015/05/total-sa-logo-energia-8.png",
    daedline: 27,
  },
];

export default function useFetchData() {
  const [allMembers, setAllMembers] = useState([]);
  const [fetched, setFetched] = useState(true);

  const [enterprise_referenceId, setEnterprise_referenceId] = useState(
    localStorage.getItem("enterprise_referenceId") || null
  );

  const [user_enterprise_referenceId, setUser_enterprise_referenceId] =
    useState(localStorage.getItem("user_enterprise_referenceId") || null);

  const [
    current_user_enterprise_referenceId,
    setCurrent_user_enterprise_referenceId,
  ] = useState(
    localStorage.getItem("current_user_enterprise_referenceId") || null
  );

  // const refreshPage = () => {};
  const userString = localStorage.getItem("user");

  useEffect(() => {
    if (userString) {
      const userData = JSON.parse(userString);
      setEnterprise_referenceId(userData.uid); // Assuming uid is the property you want to store
      setUser_enterprise_referenceId(userData.email);
      localStorage.setItem("enterprise_referenceId", userData.uid); // Storing only the UID, adjust if necessary
      localStorage.setItem("user_enterprise_referenceId", userData.email);
    }
  }, []);

  // console.log("AQUI VAMOS:", user_enterprise_referenceId);

  const { data, isLoading, error, refetch } = useQuery(
    "enterprise",
    async () => {
      try {
        const response = await axios.get(`${api_url}/enterprise`);
        const filteredData = response.data.filter(
          (entry) =>
            entry.enterprise_uid === enterprise_referenceId ||
            entry.responsibles.includes(user_enterprise_referenceId)
        );
        return filteredData || [];
      } catch (error) {
        throw new Error("Failed to fetch projects");
      }
    }
  );

  useEffect(() => {
    if (data) {
      const enterpriseReferenceIds = data.map((item) => item.enterprise_uid);
      setCurrent_user_enterprise_referenceId(enterpriseReferenceIds);
      localStorage.setItem(
        "current_user_enterprise_referenceId",
        JSON.stringify(enterpriseReferenceIds)
      );
    }
  }, [data, setCurrent_user_enterprise_referenceId]);

  useEffect(() => {
    // console.log("AQUI VAMOS:", current_user_enterprise_referenceId);
  }, [current_user_enterprise_referenceId]);

  const colRef = collection(
    db,
    `members_${
      current_user_enterprise_referenceId?.length == 0
        ? enterprise_referenceId
        : current_user_enterprise_referenceId
    }`
  );

  onSnapshot(colRef, (snapshot) => {
    if (fetched) {
      let dados = [];
      snapshot.docs.forEach((doc) => {
        dados.push({ ...doc.data(), id: doc.id });
      });
      setAllMembers(dados);
      setFetched(false);
    }
  });

  const handleCreateEnterprise = useMutation({
    mutationFn: async (values) => {
      return await axios
        .post(`${api_url}/enterprise`, values)
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateEnterpriseMembers = useMutation({
    mutationFn: async ({ id, responsibles }) => {
      return await axios.patch(`${api_url}/enterprise/${id}`, { responsibles });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleCreateProject = useMutation({
    mutationFn: async (values) => {
      return await axios
        .post(`${api_url}/project`, values)
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateProjectProgress = useMutation({
    mutationFn: async ({ id, progress }) => {
      return await axios
        .patch(`${api_url}/project/${id}`, { progress })
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDeleteProject = useMutation({
    mutationFn: async (projectId) => {
      return await axios.delete(`${api_url}/project/${projectId}`);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // ===========================TASKS=================================
  const handleCreateTask = useMutation({
    mutationFn: async (values) => {
      return await axios.post(`${api_url}/task`, values);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDeleteTask = useMutation({
    mutationFn: async (taskId) => {
      return await axios.delete(`${api_url}/task/${taskId}`);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateTaskStatus = useMutation({
    mutationFn: async ({ id, status, progressStatus }) => {
      return await axios
        .patch(`${api_url}/task/${id}`, { status, progressStatus })
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateTaskPriority = useMutation({
    mutationFn: async ({ id, priority }) => {
      return await axios
        .patch(`${api_url}/task/${id}`, { priority })
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateTaskProgress = useMutation({
    mutationFn: async ({ id, progress, progressStatus }) => {
      return await axios
        .patch(`${api_url}/task/${id}`, { progress, progressStatus })
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateTaskResponsibles = useMutation({
    mutationFn: async ({ id, responsible, status }) => {
      return await axios
        .patch(`${api_url}/task/${id}`, { responsibles: responsible, status })
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  // ===========================SUBTASKS=================================

  const handleCreateSubtask = useMutation({
    mutationFn: async (values) => {
      return await axios.post(`${api_url}/subtask`, values);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateSubtaskStart = useMutation({
    mutationFn: async ({ id, started }) => {
      return await axios
        .patch(`${api_url}/subtask/${id}`, { started })
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateSubtaskPause = useMutation({
    mutationFn: async ({ id, paused }) => {
      return await axios
        .patch(`${api_url}/subtask/${id}`, { paused })
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateSubtaskComplete = useMutation({
    mutationFn: async ({ id, completed }) => {
      return await axios
        .patch(`${api_url}/subtask/${id}`, { completed })
        .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDeleteSubtask = useMutation({
    mutationFn: async (subtaskId) => {
      return await axios.delete(`${api_url}/subtask/${subtaskId}`);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    data,
    error,
    refetch,
    isLoading,
    allClients,
    allMembers,
    handleDeleteTask,
    handleCreateTask,
    handleCreateSubtask,
    handleDeleteSubtask,
    handleCreateProject,
    handleDeleteProject,
    handleCreateEnterprise,
    handleUpdateTaskStatus,
    handleUpdateSubtaskPause,
    handleUpdateTaskProgress,
    handleUpdateSubtaskStart,
    handleUpdateTaskPriority,
    setEnterprise_referenceId,
    handleUpdateProjectProgress,
    handleUpdateSubtaskComplete,
    handleUpdateTaskResponsibles,
    handleUpdateEnterpriseMembers,
  };
}
