package ua.com.ivolnov.sci_article_library.common.exception;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Hidden
@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFound.class)
    @ResponseStatus(NOT_FOUND)
    AppErrorDto handleEntityNotFound(final EntityNotFound exception) {
        return new AppErrorDto(exception.getMessage());
    }

}
