package ua.com.ivolnov.sci_article_library.author;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Value;
import lombok.With;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@With
@Builder
@Value
public class AuthorDto {

    @JsonProperty("id")
    String id;
    @Size(min = 1, max = 255)
    @JsonProperty("first_name")
    String firstName;
    @Size(min = 1, max = 255)
    @JsonProperty("last_name")
    String lastName;

    UUID getUuid() {
        if (id == null) {
            return null;
        }
        return UUID.fromString(id);
    }
}
