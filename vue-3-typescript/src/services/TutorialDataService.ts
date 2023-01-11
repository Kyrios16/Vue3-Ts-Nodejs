import http from "@/axios-common";

class TutorialDataService {
  getAll(): Promise<any> {
    return http.get("/tutorials");
  }

  get(id: any): Promise<any> {
    return http.get(`/tutorials/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/tutorials", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/tutorials`);
  }

  findByTitle(title: string): Promise<any> {
    console.log(title)
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TutorialDataService();