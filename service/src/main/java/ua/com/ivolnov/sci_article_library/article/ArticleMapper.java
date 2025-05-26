package ua.com.ivolnov.sci_article_library.article;

import java.util.Collection;
import java.util.Set;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ua.com.ivolnov.sci_article_library.author.AuthorMapper;

import static java.util.stream.Collectors.toSet;

@RequiredArgsConstructor
@Component
class ArticleMapper {

    private final AuthorMapper authorMapper;

    ArticleDto toDto(final Article entity) {
        return ArticleDto.builder()
                .id(entity.getId().toString())
                .title(entity.getTitle())
                .authors(authorMapper.toDtos(entity.getAuthors()))
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
                .authors(authorMapper.toEntities(dto.getAuthors()))
                .journal(dto.getJournal())
                .year(dto.getYear())
                .build();
    }

}
