package ua.com.ivolnov.sci_article_library.article;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Singular;
import lombok.With;
import ua.com.ivolnov.sci_article_library.author.Author;

import static jakarta.persistence.CascadeType.DETACH;
import static jakarta.persistence.CascadeType.MERGE;
import static jakarta.persistence.CascadeType.PERSIST;
import static jakarta.persistence.CascadeType.REFRESH;
import static jakarta.persistence.GenerationType.AUTO;

@Entity(name = "article")
@Table(name = "article")
@With
@Builder
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
class Article {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id")
    @EqualsAndHashCode.Include
    private UUID id;
    @Size(min = 1, max = 255)
    @Column(name = "title", nullable = false)
    private String title;
    @Singular
    @NotEmpty
    @ManyToMany(cascade = {MERGE, REFRESH, DETACH})
    @JoinTable(name = "article_author",
            joinColumns = @JoinColumn(name = "article_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "author_id", nullable = false))
    private Set<Author> authors;
    @Size(min = 1, max = 255)
    @Column(name = "journal", nullable = false)
    private String journal;
    @Min(1900)
    @Max(2100)
    @Column(name = "year", nullable = false)
    private Integer year;

}
