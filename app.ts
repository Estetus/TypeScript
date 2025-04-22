enum roleUser {
  admin = 'admin',
  moderator = 'moderator',
  user = 'user'
}

enum genderUser {
  female = 'female',
  male = 'male'
}

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    address: {
      city: string;
      state: string;
    } 
    company: {
      department: string
    }
    gender: genderUser;
    role: roleUser
  }
  
  interface ApiResponse {
    users: User[],
    total: number,
    skip: number,
    limit: number
  }


  function assertsIsApiResponse(data: unknown): asserts data is ApiResponse {
    if (
      !data ||
      typeof data !== 'object' ||
      !('users' in data) ||
      !Array.isArray(data.users) ||
      !('total' in data)
      ) {
        throw new Error ("Invalid API response structure")
      }
  }



async function getUsers(): Promise<ApiResponse> {
  try {
    const res = await fetch('https://dummyjson.com/users');
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    const data: ApiResponse = await res.json();
    assertsIsApiResponse(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; 
  }
}
