package ua.com.ivolnov.sci_article_library.article;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
class ArticleDto {

    @Getter(NONE)
    @JsonProperty("id")
    String id;
    @JsonProperty("title")
    String title;
    @JsonProperty("authors")
    String authors;
    @JsonProperty("journal")
    String journal;
    @Min(1900)
    @Max(2100)
    @JsonProperty("year")
    Integer year;

    UUID getId() {
        if (id == null) {
            return null;
        }
        return UUID.fromString(id);
    }
}
