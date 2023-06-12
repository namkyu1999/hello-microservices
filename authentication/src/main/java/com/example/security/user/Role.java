package com.example.security.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import java.util.Collections;
import java.util.Set;
import static com.example.security.user.Permission.ADMIN_CREATE;
import static com.example.security.user.Permission.ADMIN_DELETE;
import static com.example.security.user.Permission.ADMIN_READ;
import static com.example.security.user.Permission.ADMIN_UPDATE;
import static com.example.security.user.Permission.MANAGER_CREATE;
import static com.example.security.user.Permission.MANAGER_DELETE;
import static com.example.security.user.Permission.MANAGER_READ;
import static com.example.security.user.Permission.MANAGER_UPDATE;

@RequiredArgsConstructor
public enum Role {
  USER(Collections.emptySet()),
  ADMIN(
          Set.of(
                  ADMIN_READ,
                  ADMIN_UPDATE,
                  ADMIN_DELETE,
                  ADMIN_CREATE,
                  MANAGER_READ,
                  MANAGER_UPDATE,
                  MANAGER_DELETE,
                  MANAGER_CREATE
          )
  ),
  MANAGER(
          Set.of(
                  MANAGER_READ,
                  MANAGER_UPDATE,
                  MANAGER_DELETE,
                  MANAGER_CREATE
          )
  )

  ;

  @Getter
  private final Set<Permission> permissions;
}
