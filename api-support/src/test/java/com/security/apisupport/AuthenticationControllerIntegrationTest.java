package com.security.apisupport;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.security.apisupport.dtos.LoginUserDto;
import com.security.apisupport.dtos.RegisterUserDto;
import com.security.apisupport.entities.User;
import com.security.apisupport.repositories.UserRepository;
import com.security.apisupport.services.AuthenticationService;
import com.security.apisupport.services.UserService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AuthenticationControllerIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgresContainer = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("user")
            .withPassword("password");

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private RegisterUserDto registerUserDto;
    private LoginUserDto loginUserDto;

    @BeforeEach
    void setUp() {
        registerUserDto = new RegisterUserDto();
        registerUserDto.setEmail("integrationtest@example.com");
        registerUserDto.setPassword("password");
        registerUserDto.setFullName("Test User");

        loginUserDto = new LoginUserDto();
        loginUserDto.setEmail("integrationtest@example.com");
        loginUserDto.setPassword("password");
    }

/*
    @Test
    @WithMockUser
    @Order(2)
    void shouldAuthenticateUser_andReturnToken() throws Exception {
        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginUserDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.access_token").isNotEmpty())
                .andExpect(jsonPath("$.refresh_token").isNotEmpty());
    }
*/

    @Test
    @WithMockUser
    @Order(1)
    void shouldRegisterUser_andReturnCreatedUser() throws Exception {
        mockMvc.perform(post("/api/v1/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerUserDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("integrationtest@example.com"));

        User registeredUser = userRepository.findByEmail("integrationtest@example.com").orElseThrow();
        assert registeredUser != null;
    }

}
