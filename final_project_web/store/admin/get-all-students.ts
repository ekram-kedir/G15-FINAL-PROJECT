// src/api/StudentApi.ts
export type Section = {
  id?: number;
  section: string;
}
  export type Student = {
    id: number;
    fullName?: string; 
    userId: string;
    email?: string;
    SectionsOfUser?: Section[]; 
    role?: string;
    status?: string;
};

    interface StudentApiResponse {
      user: Student[];
    }
    interface UpdateStudentParams {
      id: number;
      updateData: Partial<Student>;
    }
    
    interface AddSectionsParams{
      userId?: string;
      sections: string;
    }
    
     const token = localStorage.getItem("token");
    export const fetchAllStudents = async (): Promise<StudentApiResponse> => {
      try {
        const response = await fetch('http://localhost:5000/upload/fetchAllStudents?_=${new Date().getTime()}', {
          method: "GET",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonResponse = await response.json();
        const data: StudentApiResponse = jsonResponse; // The correct type assertion
        console.log("API Response Data:", data); // Log the API response data for debugging
        return data; // Directly return the response data
      } catch (error) {
        console.error('Error fetching Students:', error);
        throw error;
      }
    };
    export const updateStudent = async ({ id, updateData }: UpdateStudentParams): Promise<any> => {
      try {
        console.log('Sending update payload to server:', JSON.stringify(updateData)); // Debugging line
        const response = await fetch(
          `http://localhost:5000/upload/updateUser/${id}`,
          {
            method: "PUT",
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          }
        );
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('There was a problem with the update operation:', error);
        throw error;
      }
    };
    
   
    
    export const addSections = async ({ userId, sections }: { userId: string, sections: string }): Promise<any> => {
      try {
        console.log("Sending payload to server:", JSON.stringify({ userId, sections }));

    
        const response = await fetch(`http://localhost:5000/upload/AddSections`, {
          method: 'POST',
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, sections }),
          
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // Assuming the backend returns the added sections
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
      }
    };
    
    export const deleteSection = async (sectionId: number): Promise<any> => {
      try {
        const response = await fetch(`http://localhost:5000/upload/DeleteSections/${sectionId}`, {
          method: 'DELETE',
          headers: {
           ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('There was a problem with the delete operation:', error);
        throw error;
      }
    };
    
    export const deleteUser = async ( id: number): Promise<any> => {
      try {
        
        const response = await fetch(`http://localhost:5000/upload/deleteUser/${id}`, {
          method: 'DELETE',
          headers: {
           ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('There was a problem with the delete operation:', error);
        throw error;
      }
    };
   