package ua.com.ivolnov.sci_article_library.article;

import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Value;
import lombok.With;
import lombok.extern.jackson.Jacksonized;
import ua.com.ivolnov.sci_article_library.author.AuthorDto;

import static lombok.AccessLevel.NONE;

@Jacksonized
@With
@Builder
@Value
class ArticleDto {

    @Getter(NONE)
    @JsonProperty("id")
    String id;
    @Size(min = 1, max = 255)
    @JsonProperty("title")
    String title;
    @Size(min = 1, max = 255)
    @JsonProperty("authors")
    Set<AuthorDto> authors;
    @Size(min = 1, max = 255)
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
