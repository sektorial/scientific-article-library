package ua.com.ivolnov.sci_article_library.article;

import java.util.Collection;
import java.util.Set;

import org.springframework.stereotype.Component;

import static java.util.stream.Collectors.toSet;

@Component
class ArticleMapper {


    ScientificArticleDto toDto(final ScientificArticle entity) {
        return ScientificArticleDto.builder()
                .id(entity.getId().toString())
                .title(entity.getTitle())
                .authors(entity.getAuthors())
                .journal(entity.getJournal())
                .year(entity.getYear())
                .build();
    }


    Set<ScientificArticleDto> toDtos(final Collection<ScientificArticle> entities) {
        return entities.stream()
                .map(this::toDto)
                .collect(toSet());
    }

    ScientificArticle toEntity(final ScientificArticleDto dto) {
        return ScientificArticle.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .authors(dto.getAuthors())
                .journal(dto.getJournal())
                .year(dto.getYear())
                .build();
    }

}
