package BACKEND.BACKEND.wallet.controller;

import BACKEND.BACKEND.wallet.dto.TransactionRequest;
import BACKEND.BACKEND.wallet.model.Transaction;
import BACKEND.BACKEND.wallet.model.Wallet;
import BACKEND.BACKEND.wallet.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TransactionController {

    private final WalletService walletService;

    private String getCurrentUserId() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/add")
    public ResponseEntity<Transaction> addTransaction(@RequestBody TransactionRequest request) {
        String userId = getCurrentUserId();
        Transaction transaction = walletService.addTransaction(
                userId,
                request.getAmount(),
                request.getCategory());
        return ResponseEntity.ok(transaction);
    }

    @GetMapping("/history")
    public ResponseEntity<List<Transaction>> getHistory() {
        String userId = getCurrentUserId();
        List<Transaction> history = walletService.getTransactionHistory(userId);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/wallet")
    public ResponseEntity<Wallet> getWallet() {
        String userId = getCurrentUserId();
        Wallet wallet = walletService.getWallet(userId);
        return ResponseEntity.ok(wallet);
    }
}
