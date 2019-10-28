package br.com.garug.placeholder.placeholder.core;

import br.com.garug.placeholder.placeholder.core.exception.BusinessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({BusinessException.class})
    public final ResponseEntity<?> handleBusinessException(BusinessException ex, WebRequest request) {
        ApiError error = new ApiError(HttpStatus.BAD_REQUEST, ex.getMessage(), ex.getMessage());
        return new ResponseEntity<>(error, error.getStatus());
    }
}
