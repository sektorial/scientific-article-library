package ua.com.ivolnov.sci_article_library.article;

import java.util.Collection;
import java.util.Set;

import org.springframework.stereotype.Component;

import static java.util.stream.Collectors.toSet;

@Component
class ArticleMapper {


    ArticleDto toDto(final Article entity) {
        return ArticleDto.builder()
                .id(entity.getId().toString())
                .title(entity.getTitle())
                .authors(entity.getAuthors())
                .journal(entity.getJournal())
                .year(entity.getYear())
                .build();
    }


    Set<ArticleDto> toDtos(final Collection<Article> entities) {
        return entities.stream()
                .map(this::toDto)
                .collect(toSet());
    }

    Article toEntity(final ArticleDto dto) {
        return Article.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .authors(dto.getAuthors())
                .journal(dto.getJournal())
                .year(dto.getYear())
                .build();
    }

}
