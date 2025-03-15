import {createQuery} from "react-query-kit";
import {DynamicOptions} from "@/model/API/form-schema";
import {networkClient} from "@/lib/axios";
import {findArrayInObject} from "@/lib/utils";


interface Args extends DynamicOptions{
  dependentValue?:string
}

export const useFetchSelectQueryOptions=createQuery<string[],Args>({
  queryKey:["FetchSelectQueryOptions"],
  fetcher:async ({method,endpoint,dependsOn,dependentValue})=>{
    const params={[dependsOn]:dependentValue};
    const response=await networkClient.request({
      method:method,
      url:endpoint,
      baseURL:process.env.NEXT_PUBLIC_BASE_URL,
      params:params,
      data:method==="POST"?params:undefined,
    })
    return findArrayInObject(response.data)??[]
  }
})