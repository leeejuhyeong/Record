package com.record.the_record.aop.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class APIException {
    private final String message;
    private final LocalDateTime errorOccurrenceTime;

    public APIException(RuntimeException e) {
        this.message = e.getMessage();
        this.errorOccurrenceTime = LocalDateTime.now();
    }

}
