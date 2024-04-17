package com.denishrynkevich.easyaks.data.network

import com.denishrynkevich.easyaks.data.models.Question
import com.denishrynkevich.easyaks.data.models.Questions
import retrofit2.Response
import retrofit2.http.GET

interface ApiService {
    @GET("/questions")
    suspend fun getAllQuestions(): Response<List<Questions>>
}