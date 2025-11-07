# 백엔드 API 설계 문서

## 개요
현재 Next.js 프론트엔드에서 사용 중인 기능을 기반으로 스프링부트 백엔드 API를 설계합니다.

## 데이터 모델

### Whiskey Entity
```java
@Entity
public class Whiskey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;                    // 위스키명 (필수)
    private String englishName;             // 영문명 (선택)
    private String brand;                   // 브랜드 (필수)
    
    @Enumerated(EnumType.STRING)
    private WhiskeyCategory category;      // 종류 (필수)
    
    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<WhiskeySubCategory> subCategories;  // 특성 (셰리, 피트, 버번) - 위스키 카테고리일 때만
    
    @Enumerated(EnumType.STRING)
    private WhiskeySubCategory subCategory;  // 하위 호환성 (deprecated)
    
    private Double abv;                     // 알코올 도수 (Alcohol By Volume, %)
    private Double volume;                  // 용량 (ml)
    
    private String nation;                    // 국가
    private String region;                  // 생산지역
    private Double starPoint;               // 별점
    
    private String imageDataUrl;             // 이미지 URL (Base64 또는 파일 저장소 경로)
    private String notes;                   // 테이스팅 노트
    
    private String nose;                    // 노즈
    private String palate;                 // 팔레트
    private String finish;                 // 피니시
    
    private String personalNote;            // 개인 소감
    
    @ElementCollection
    private List<Pairing> pairings;         // 페어링 추천
    
    @ElementCollection
    private List<String> flavorTags;        // 테이스팅 프로파일 태그
    
    @CreatedDate
    private Long createdAt;                 // 생성일시 (timestamp)
    
    @LastModifiedDate
    private Long updatedAt;                 // 수정일시 (timestamp)
}

public enum WhiskeyCategory {
    SINGLE_MALT,           // Single Malt
    BLENDED_MALT,          // Blended Malt
    WORLD_WHISKEY,         // World Whiskey
    GIN_VODKA,             // Gin & Vodka
    WINE_LIQUEUR,          // Wine & Liqueur
    SAKE_TRADITIONAL,      // Sake & Traditional
    BEER                   // Beer
}

public enum WhiskeySubCategory {
    SHERRY,                // 셰리
    PEAT,                  // 피트
    BOURBON                // 버번
}

@Embeddable
public class Pairing {
    private String icon;                   // 아이콘
    private String name;                   // 이름
}
```

## API 엔드포인트

### 1. 위스키 CRUD API

#### 1.1 전체 위스키 목록 조회
```
GET /api/whiskeys
Query Parameters:
  - category: WhiskeyCategory (optional) - 카테고리 필터
  - search: String (optional) - 이름/브랜드 검색
  - page: int (optional, default: 0) - 페이지 번호
  - size: int (optional, default: 20) - 페이지 크기
  - sort: String (optional, default: "createdAt,desc") - 정렬 기준

Response:
{
  "content": [
    {
      "id": 1,
      "name": "더 글렌리벳 12",
      "englishName": "The Glenlivet 12",
      "brand": "Glenlivet",
      "category": "SINGLE_MALT",
      "subCategories": ["SHERRY"],
      "abv": 40.0,
      "volume": 700.0,
      "nation": "스코틀랜드",
      "region": "스페이사이드",
      "starPoint": 4.5,
      "imageDataUrl": "/images/whiskey/1.jpg",
      "notes": "부드러운 오크 향",
      "nose": "달콤한 바닐라와 오크",
      "palate": "부드럽고 풍부한 맛",
      "finish": "긴 여운",
      "personalNote": "개인 소감",
      "pairings": [
        {
          "icon": "🍫",
          "name": "다크 초콜릿"
        }
      ],
      "flavorTags": ["달콤함", "오크"],
      "createdAt": 1705285800000,
      "updatedAt": 1705285800000
    }
  ],
  "totalElements": 30,
  "totalPages": 2,
  "number": 0,
  "size": 20
}
```

#### 1.2 위스키 상세 조회
```
GET /api/whiskeys/{id}

Response:
{
  "id": 1,
  "name": "더 글렌리벳 12",
  "englishName": "The Glenlivet 12",
  "brand": "Glenlivet",
  "category": "SINGLE_MALT",
  "subCategories": ["SHERRY"],
  "abv": 40.0,
  "volume": 700.0,
  "nation": "스코틀랜드",
  "region": "스페이사이드",
  "starPoint": 4.5,
  "imageDataUrl": "/images/whiskey/1.jpg",
  "notes": "부드러운 오크 향",
  "nose": "달콤한 바닐라와 오크",
  "palate": "부드럽고 풍부한 맛",
  "finish": "긴 여운",
  "personalNote": "개인 소감",
  "pairings": [
    {
      "icon": "🍫",
      "name": "다크 초콜릿"
    }
  ],
  "flavorTags": ["달콤함", "오크"],
  "createdAt": 1705285800000,
  "updatedAt": 1705285800000
}
```

#### 1.3 위스키 생성
```
POST /api/whiskeys
Content-Type: multipart/form-data

Request Body:
  - name: String (required)
  - englishName: String (optional)
  - brand: String (required)
  - category: WhiskeyCategory (required)
  - subCategories: List<WhiskeySubCategory> (optional) - 특성 (셰리, 피트, 버번)
  - abv: Double (optional) - 알코올 도수 (%)
  - volume: Double (optional) - 용량 (ml)
  - nation: String (optional) - 국가
  - region: String (optional) - 생산지역
  - starPoint: Double (optional) - 별점
  - notes: String (optional) - 테이스팅 노트
  - nose: String (optional) - 노즈
  - palate: String (optional) - 팔레트
  - finish: String (optional) - 피니시
  - personalNote: String (optional) - 개인 소감
  - pairings: List<PairingDto> (optional) - 페어링
  - flavorTags: List<String> (optional) - 테이스팅 프로파일 태그
  - image: File (optional) - 이미지 파일

Response:
{
  "id": 1,
  "name": "더 글렌리벳 12",
  ...
}
```

#### 1.4 위스키 수정
```
PUT /api/whiskeys/{id}
Content-Type: multipart/form-data

Request Body: (생성과 동일)

Response:
{
  "id": 1,
  "name": "더 글렌리벳 12",
  ...
}
```

#### 1.5 위스키 삭제
```
DELETE /api/whiskeys/{id}

Response: 204 No Content
```

### 2. 이미지 업로드 API

#### 2.1 이미지 업로드
```
POST /api/whiskeys/{id}/image
Content-Type: multipart/form-data

Request Body:
  - image: File (required)

Response:
{
  "imageDataUrl": "/images/whiskey/1.jpg"
}
```

#### 2.2 이미지 삭제
```
DELETE /api/whiskeys/{id}/image

Response: 204 No Content
```

### 3. 검색 및 필터링 API

#### 3.1 카테고리별 조회
```
GET /api/whiskeys/category/{category}
Query Parameters:
  - search: String (optional)
  - page: int (optional)
  - size: int (optional)

Response: (목록 조회와 동일)
```

#### 3.2 검색 (이름/브랜드)
```
GET /api/whiskeys/search
Query Parameters:
  - q: String (required) - 검색어
  - category: WhiskeyCategory (optional)
  - page: int (optional)
  - size: int (optional)

Response: (목록 조회와 동일)
```

## 예외 처리

### Error Response 형식
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "위스키명은 필수입니다.",
  "path": "/api/whiskeys"
}
```

### 주요 예외 상황
- 400: 잘못된 요청 (validation 실패)
- 404: 리소스를 찾을 수 없음
- 500: 서버 내부 오류

## 구현 시 고려사항

### 1. 파일 저장
- 이미지는 서버 로컬 저장소 또는 클라우드 스토리지(S3, Cloudinary 등) 사용
- 파일명은 UUID 기반으로 생성하여 중복 방지
- 이미지 리사이징/최적화 고려

### 2. 인증/인가 (향후 확장)
- 현재는 단일 사용자 가정
- 향후 멀티 유저 지원 시 JWT 인증 추가
- User 엔티티와 연관관계 설정

### 3. 페이징
- Spring Data JPA의 Pageable 사용
- 기본 페이지 크기: 20
- 무한 스크롤 지원을 위한 커서 기반 페이징 고려

### 4. 검색 최적화
- 현재: 단순 LIKE 검색
- 향후: Elasticsearch 또는 Full-Text Search 고려

### 5. CORS 설정
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");
            }
        };
    }
}
```

## DTO 클래스 예시

### WhiskeyRequestDto
```java
@Data
public class WhiskeyRequestDto {
    @NotBlank(message = "위스키명은 필수입니다.")
    private String name;
    
    private String englishName;
    
    @NotBlank(message = "브랜드는 필수입니다.")
    private String brand;
    
    @NotNull(message = "종류는 필수입니다.")
    private WhiskeyCategory category;
    
    private List<WhiskeySubCategory> subCategories;  // 특성 (셰리, 피트, 버번)
    
    private Double abv;              // 알코올 도수 (%)
    private Double volume;           // 용량 (ml)
    
    private String nation;           // 국가
    private String region;          // 생산지역
    private Double starPoint;        // 별점
    
    private String imageDataUrl;     // 이미지 URL (Base64 또는 파일 경로)
    private String notes;            // 테이스팅 노트
    
    private String nose;             // 노즈
    private String palate;          // 팔레트
    private String finish;          // 피니시
    
    private String personalNote;     // 개인 소감
    
    private List<PairingDto> pairings;  // 페어링
    private List<String> flavorTags;     // 테이스팅 프로파일 태그
}

@Data
public class PairingDto {
    private String icon;
    private String name;
}
```

### WhiskeyResponseDto
```java
@Data
public class WhiskeyResponseDto {
    private Long id;
    private String name;
    private String englishName;
    private String brand;
    private WhiskeyCategory category;
    private List<WhiskeySubCategory> subCategories;
    private Double abv;
    private Double volume;
    private String nation;
    private String region;
    private Double starPoint;
    private String imageDataUrl;
    private String notes;
    private String nose;
    private String palate;
    private String finish;
    private String personalNote;
    private List<PairingDto> pairings;
    private List<String> flavorTags;
    private Long createdAt;
    private Long updatedAt;
}
```

## Controller 예시

```java
@RestController
@RequestMapping("/api/whiskeys")
@RequiredArgsConstructor
public class WhiskeyController {
    
    private final WhiskeyService whiskeyService;
    
    @GetMapping
    public ResponseEntity<Page<WhiskeyResponseDto>> getAllWhiskeys(
            @RequestParam(required = false) WhiskeyCategory category,
            @RequestParam(required = false) String search,
            Pageable pageable) {
        Page<WhiskeyResponseDto> whiskeys = whiskeyService.findAll(category, search, pageable);
        return ResponseEntity.ok(whiskeys);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<WhiskeyResponseDto> getWhiskey(@PathVariable Long id) {
        WhiskeyResponseDto whiskey = whiskeyService.findById(id);
        return ResponseEntity.ok(whiskey);
    }
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<WhiskeyResponseDto> createWhiskey(
            @ModelAttribute WhiskeyRequestDto request,
            @RequestParam(required = false) MultipartFile image) {
        WhiskeyResponseDto whiskey = whiskeyService.create(request, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(whiskey);
    }
    
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<WhiskeyResponseDto> updateWhiskey(
            @PathVariable Long id,
            @ModelAttribute WhiskeyRequestDto request,
            @RequestParam(required = false) MultipartFile image) {
        WhiskeyResponseDto whiskey = whiskeyService.update(id, request, image);
        return ResponseEntity.ok(whiskey);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWhiskey(@PathVariable Long id) {
        whiskeyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

## 프론트엔드 연동 시 변경사항

### 1. API 클라이언트 생성
- `lib/api.ts` 파일 생성
- axios 또는 fetch 사용
- 환경 변수로 API URL 관리

### 2. Storage 함수 변경
- `lib/storage.ts`의 localStorage 호출을 API 호출로 변경
- 에러 처리 및 로딩 상태 관리

### 3. 이미지 처리
- Base64 대신 파일 업로드 방식으로 변경
- FormData 사용

