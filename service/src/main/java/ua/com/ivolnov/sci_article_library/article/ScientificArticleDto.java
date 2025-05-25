package ua.com.ivolnov.sci_article_library.article;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
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
class ScientificArticleDto {

    @Getter(NONE)
    @JsonProperty("uuid")
    String id;
    @JsonProperty("title")
    String title;
    @JsonProperty("authors")
    String authors;
    @JsonProperty("journal")
    String journal;
    @JsonProperty("year")
    String year;

    UUID getId() {
        return UUID.fromString(id);
    }
}
