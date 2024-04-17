package com.denishrynkevich.easyaks.data.network

import javax.inject.Inject

class ApiRepository @Inject constructor(private val apiService: ApiService) {
    suspend fun getAllQuestions() = apiService.getAllQuestions()
}