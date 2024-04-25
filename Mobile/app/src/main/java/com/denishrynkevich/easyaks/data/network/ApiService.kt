package com.denishrynkevich.easyaks.data.network

import com.denishrynkevich.easyaks.data.models.Data
import retrofit2.Response
import retrofit2.http.GET

interface ApiService {

    @GET("/2326/prod/themes")
    suspend fun getAllQuestions(): Response<Data>
}

