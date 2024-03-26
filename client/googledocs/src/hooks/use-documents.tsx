import { useContext, useEffect, useState, useCallback } from "react";
import useAuth from "./use-auth";
import DocumentInterface from "../types/interfaces/document";
import { ToastContext } from "../contexts/toast-context";
import DocumentService from "../services/document-service";

const useDocuments = () => {
  const { accessToken } = useAuth();
  const [documents, setDocuments] = useState<Array<DocumentInterface>>([]);
  const [loading, setLoading] = useState(false);
  const { error } = useContext(ToastContext);

  const loadDocuments = useCallback(
    async (accessToken: string) => {
      setLoading(true);

      try {
        const response = await DocumentService.list(accessToken);
        setDocuments(response.data as Array<DocumentInterface>);
      } catch (err) {
        error("Unable to load documents. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [error]
  );
  useEffect(() => {
    if (accessToken === null) return;
    loadDocuments(accessToken);
  }, [accessToken, loadDocuments]);

  return {
    documents,
    loading,
    setDocuments,
    setLoading,
  };
};

export default useDocuments;
