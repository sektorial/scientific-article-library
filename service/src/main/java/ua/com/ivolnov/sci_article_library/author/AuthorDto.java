package ua.com.ivolnov.sci_article_library.author;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Value;
import lombok.With;
import lombok.extern.jackson.Jacksonized;

import static lombok.AccessLevel.NONE;

@Jacksonized
@With
@Builder
@Value
class AuthorDto {

    @Getter(NONE)
    @JsonProperty("id")
    String id;
    @Size(min = 1, max = 255)
    @JsonProperty("first-name")
    String firstName;
    @Size(min = 1, max = 255)
    @JsonProperty("last-name")
    String lastName;

    UUID getId() {
        if (id == null) {
            return null;
        }
        return UUID.fromString(id);
    }
}
