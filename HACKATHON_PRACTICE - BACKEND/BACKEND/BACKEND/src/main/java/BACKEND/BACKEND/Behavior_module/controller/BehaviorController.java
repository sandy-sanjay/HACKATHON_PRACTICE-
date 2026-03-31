package BACKEND.BACKEND.Behavior_module.controller;

import BACKEND.BACKEND.Behavior_module.dto.ApiResponse;
import BACKEND.BACKEND.Behavior_module.dto.BehaviorTagRequest;
import BACKEND.BACKEND.Behavior_module.model.BehaviorTag;
import BACKEND.BACKEND.Behavior_module.service.BehaviorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/behavior")
@CrossOrigin(origins = "*")
public class BehaviorController {

    @Autowired
    private BehaviorService behaviorService;

    private String getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.toString();
    }

    @PostMapping("/tag")
    public ResponseEntity<ApiResponse<BehaviorTag>> tagTransaction(
            @RequestBody BehaviorTagRequest request) {
        
        String userId = getCurrentUserId();
        BehaviorTag savedTag = behaviorService.tagTransaction(userId, request.getTransactionId(), request.getMood());
        
        return ResponseEntity.ok(ApiResponse.success(savedTag, "Behavior tag saved successfully"));
    }

    @GetMapping("/insights")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getInsights() {
        
        String userId = getCurrentUserId();
        Map<String, Object> insights = behaviorService.generateInsights(userId);
        
        return ResponseEntity.ok(ApiResponse.success(insights, "Behavioral insights generated successfully"));
    }
}
