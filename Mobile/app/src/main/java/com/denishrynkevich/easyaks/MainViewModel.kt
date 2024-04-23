package com.denishrynkevich.easyaks

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.denishrynkevich.easyaks.data.network.ApiRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(private val repository: ApiRepository) : ViewModel() {

    private val _themeNames = MutableLiveData<List<String>>()
    val themeNames: LiveData<List<String>>
        get() = _themeNames

    fun getAllQuestions() {
        viewModelScope.launch {
            try {
                val response = repository.getAllQuestions()
                if (response.isSuccessful) {
                    val responseBody = response.body()?.string()
                    Log.d("CheckData", "RAW: ${responseBody}")
                    // Далее обработайте полученную строку ответа
                } else {
                    // Обработайте ошибку запроса
                    Log.e("CheckData", "Error: ${response.errorBody()?.string()}")
                }
            } catch (e: Exception) {
                // Обработайте исключение
                Log.e("CheckData", "Exception: ${e.message}")
            }
        }
    }
}


