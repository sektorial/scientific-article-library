package ua.com.ivolnov.sci_article_library.author;

import java.util.Collection;
import java.util.Set;

import org.springframework.stereotype.Component;

import static java.util.stream.Collectors.toSet;

@Component
public class AuthorMapper {

    public Set<AuthorDto> toDtos(final Collection<Author> entities) {
        return entities.stream()
                .map(this::toDto)
                .collect(toSet());
    }

    public Set<Author> toEntities(final Collection<AuthorDto> dtos) {
        return dtos.stream()
                .map(this::toEntity)
                .collect(toSet());
    }

    AuthorDto toDto(final Author entity) {
        return AuthorDto.builder()
                .id(entity.getId().toString())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .build();
    }

    Author toEntity(final AuthorDto dto) {
        return Author.builder()
                .id(dto.getUuid())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .build();
    }

}
