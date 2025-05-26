package ua.com.ivolnov.sci_article_library.author;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.With;

import static jakarta.persistence.GenerationType.AUTO;

@Entity(name = "author")
@Table(name = "author")
@With
@Builder
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class Author {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id")
    @EqualsAndHashCode.Include
    private UUID id;
    @Size(min = 1, max = 255)
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Size(min = 1, max = 255)
    @Column(name = "last_name", nullable = false)
    private String lastName;

}
