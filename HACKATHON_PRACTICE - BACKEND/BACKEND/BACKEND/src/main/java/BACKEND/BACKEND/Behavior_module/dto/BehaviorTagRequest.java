package BACKEND.BACKEND.Behavior_module.dto;

import lombok.Data;

@Data
public class BehaviorTagRequest {
    private String transactionId;
    private String mood;
}
