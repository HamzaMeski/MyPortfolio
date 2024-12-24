import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeDisplayService {
  private javaSnippets = [
    `@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(
            Application.class, args
        );
    }
}`,
    `@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }
}`,
    `@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        return userRepository
            .save(user);
    }
}`
  ];

  private springBootSnippets = [
    `@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String username;
    
    @OneToMany(mappedBy = "user")
    private List<Order> orders;
}`,
    `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(
        HttpSecurity http
    ) throws Exception {
        http.authorizeRequests()
            .antMatchers("/api/**")
            .authenticated()
            .and()
            .oauth2Login();
        return http.build();
    }
}`,
    `@Repository
public interface UserRepository 
    extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u 
            WHERE u.email = :email")
    Optional<User> findByEmail(
        @Param("email") String email
    );
}`
  ];

  getCurrentSnippet(type: 'java' | 'spring'): string {
    const snippets = type === 'java' ? this.javaSnippets : this.springBootSnippets;
    const index = Math.floor(Date.now() / 5000) % snippets.length;
    return snippets[index];
  }
}
