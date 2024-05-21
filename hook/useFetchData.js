import axios from "axios";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { db } from "../src/firebase";

const api_url = "http://localhost:3001";

export default function useFetchData() {
  const [allMembers, setAllMembers] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [enterprise_referenceId, setEnterprise_referenceId] = useState(
    localStorage.getItem("enterprise_referenceId") || null
  );

  const [notificationEvents, setNotificationEvents] = useState([]);

  const [user_enterprise_referenceId, setUser_enterprise_referenceId] =
    useState(localStorage.getItem("user_enterprise_referenceId") || null);

  const [
    current_user_enterprise_referenceId,
    setCurrent_user_enterprise_referenceId,
  ] = useState(
    localStorage.getItem("current_user_enterprise_referenceId") || null
  );

  const userString = localStorage.getItem("user");

  useEffect(() => {
    if (userString) {
      const userData = JSON.parse(userString);
      setEnterprise_referenceId(userData.uid);
      setUser_enterprise_referenceId(userData.email);
      localStorage.setItem("enterprise_referenceId", userData.uid);
      localStorage.setItem("user_enterprise_referenceId", userData.email);
    }
  }, []);

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
    const membersColRef = collection(
      db,
      `members_${
        current_user_enterprise_referenceId?.length == 0
          ? enterprise_referenceId
          : current_user_enterprise_referenceId
      }`
    );

    const clientsColRef = collection(
      db,
      `clients_${
        current_user_enterprise_referenceId?.length == 0
          ? enterprise_referenceId
          : current_user_enterprise_referenceId
      }`
    );

    const unsubscribeMembers = onSnapshot(membersColRef, (snapshot) => {
      let dados = [];
      snapshot.docs.forEach((doc) => {
        dados.push({ ...doc.data(), id: doc.id });
      });
      setAllMembers(dados);
    });

    const unsubscribeClients = onSnapshot(clientsColRef, (snapshot) => {
      let dados = [];
      snapshot.docs.forEach((doc) => {
        dados.push({ ...doc.data(), id: doc.id });
      });
      setAllClients(dados);
    });

    return () => {
      unsubscribeMembers();
      unsubscribeClients();
    };
  }, [current_user_enterprise_referenceId, enterprise_referenceId]);

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
      return await axios.patch(`${api_url}/enterprise/${id}`, {
        responsibles: responsibles,
      });
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

  const handleUpdateTaskDeadline = useMutation({
    mutationFn: async ({ id, deadline }) => {
      return await axios.patch(`${api_url}/task/${id}`, { deadline });
      // .then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateTaskReferenceLink = useMutation({
    mutationFn: async ({ id, reference_link }) => {
      return await axios
        .patch(`${api_url}/task/${id}`, { reference_link })
        .then((response) => response.data);
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

  const handleCreateRole = useMutation({
    mutationFn: async (values) => {
      return await axios.post(`${api_url}/role`, values);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDeleteRole = useMutation({
    mutationFn: async (roleId) => {
      return await axios.delete(`${api_url}/role/${roleId}`);
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
    handleCreateRole,
    handleDeleteRole,
    handleDeleteTask,
    handleCreateTask,
    notificationEvents,
    handleCreateSubtask,
    handleDeleteSubtask,
    handleCreateProject,
    handleDeleteProject,
    handleCreateEnterprise,
    handleUpdateTaskStatus,
    handleUpdateTaskDeadline,
    handleUpdateSubtaskPause,
    handleUpdateTaskProgress,
    handleUpdateSubtaskStart,
    handleUpdateTaskPriority,
    setEnterprise_referenceId,
    handleUpdateProjectProgress,
    handleUpdateSubtaskComplete,
    handleUpdateTaskResponsibles,
    handleUpdateTaskReferenceLink,
    handleUpdateEnterpriseMembers,
  };
}
