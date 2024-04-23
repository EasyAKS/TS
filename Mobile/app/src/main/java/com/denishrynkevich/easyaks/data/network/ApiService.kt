package com.denishrynkevich.easyaks.data.network

import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.GET

interface ApiService {
    @GET("/2326/prod/themes")
    suspend fun getAllQuestions(): Response<ResponseBody>
}
