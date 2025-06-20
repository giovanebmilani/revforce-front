import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "./utils";
import { queryClient } from "@/main";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ACCOUNT_ID = localStorage.getItem("account_id");
//const LIST_EVENTS_ENDPOINT = `${API_BASE_URL}/event/${ACCOUNT_ID}/all`;
const CREATE_EVENT_ENDPOINT = `${API_BASE_URL}/event/`;
const makeGetEventEndpoint = (eventId: string) =>
  `${API_BASE_URL}/event/${eventId}`;
const makeListEventsEndpoint = (chartId: string) =>
  `${API_BASE_URL}/event/${chartId}`;

export type CreateEventRequest = {
  chart_id: string,
  name: string,
  description: string,
  date: string,
  color: string
}

export type UpdateEventRequest = {
  event_id: string;
  name: string;
  description: string;
  date: string;
  color: string;
};

export type EventType = {
  id: string,
  name: string,
  description: string,
  date: string,
  color: string
}

export type ListEventsResponse = EventType[];

export const useListEvents = (chartId : string) => {
  return useQuery<ListEventsResponse, Error>({
    queryKey: [`listEvents-${chartId}`],
    queryFn: async () => {
      try {
        if (!ACCOUNT_ID) {
          throw new Error("Account ID not found in local storage.");
        }
        const response = await axios.get<ListEventsResponse>(
          makeListEventsEndpoint(chartId),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const friendlyMessage = getErrorMessage(error);
          throw new Error(friendlyMessage);
        } else {
          console.error("Unexpected error:", error);
          throw new Error("Ocorreu um erro inesperado na aplicação.");
        }
      }
    },
    refetchOnWindowFocus: true,
  });
};

export const usePostNewEvent = (chart_id : string) => {
  return useMutation<string, Error, CreateEventRequest>({
    mutationFn: async (event: CreateEventRequest) => {
      try {
        const response = await axios.post<string>(CREATE_EVENT_ENDPOINT, event, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const friendlyMessage = getErrorMessage(error);
          throw new Error(friendlyMessage);
        } else {
          throw new Error("Ocorreu um erro inesperado na aplicação.");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`listEvents-${chart_id}`],
      })
    },
  });
};

export const useDeleteEvent = (chart_id: string) => {
  return useMutation<string, Error, string>({
    mutationFn: async (eventId: string) => {
      try {
        const response = await axios.delete<string>(makeGetEventEndpoint(eventId), {
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const friendlyMessage = getErrorMessage(error);
          throw new Error(friendlyMessage);
        } else {
          throw new Error("Ocorreu um erro inesperado na aplicação.");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`listEvents-${chart_id}`],
      });
    },
  });
};


export const useGetEvent = (eventId: string) => {
  return useQuery<EventType, Error>({
    queryKey: [`get-${eventId}`],
    queryFn: async () => {
      try {
        const response = await axios.get<EventType>(
          makeGetEventEndpoint(eventId),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const friendlyMessage = getErrorMessage(error);
          throw new Error(friendlyMessage);
        } else {
          throw new Error("Ocorreu um erro inesperado na aplicação.");
        }
      }
    },
    refetchOnWindowFocus: true,
  });
};

export const useUpdateEvent = (chart_id: string) => {
  return useMutation<string, Error, UpdateEventRequest>({
    mutationFn: async (event: UpdateEventRequest) => {
      try {
        const response = await axios.put<string>(
          makeGetEventEndpoint(event.event_id),
          {
            name: event.name,
            description: event.description,
            date: event.date,
            color: event.color,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const friendlyMessage = getErrorMessage(error);
          throw new Error(friendlyMessage);
        } else {
          throw new Error("Ocorreu um erro inesperado na aplicação.");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`listEvents-${chart_id}`],
      });
    },
  });
};