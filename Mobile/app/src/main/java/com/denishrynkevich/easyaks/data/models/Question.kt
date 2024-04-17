package com.denishrynkevich.easyaks.data.models

data class Question(
    val answers: Answers,
    val picture: String,
    val questionFullDescription: String,
    val questionNumber: String
)