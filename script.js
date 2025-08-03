// script.js
document.getElementById('complaintForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交

    // 获取表单数据
    const complaintType = document.getElementById('complaintType').value;
    const complaintTarget = document.getElementById('complaintTarget').value;
    const complaintContent = document.getElementById('complaintContent').value;
    const evidence = document.getElementById('evidence').files;

    // 简单验证
    if (!complaintType || !complaintTarget || !complaintContent) {
        showFeedback('请填写所有必填字段。', 'error');
        return;
    }

    // 处理证据上传（这里仅作演示，实际需要上传到服务器）
    let evidenceFiles = [];
    if (evidence.length > 0) {
        for (let i = 0; i < evidence.length; i++) {
            evidenceFiles.push(evidence[i].name);
        }
    }

    // 模拟提交投诉（实际项目中需发送到后端）
    // 这里使用fetch API发送数据到后端API
    const formData = new FormData();
    formData.append('complaintType', complaintType);
    formData.append('complaintTarget', complaintTarget);
    formData.append('complaintContent', complaintContent);
    for (let i = 0; i < evidence.length; i++) {
        formData.append('evidence', evidence[i]);
    }

    // 假设后端API地址为 '/api/complaint'
    fetch('/api/complaint', {
        method: 'POST',
        body: formData
        // 注意：使用FormData时不需要设置Content-Type，浏览器会自动设置
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应不是OK');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            showFeedback('投诉提交成功！我们会尽快处理。', 'success');
            document.getElementById('complaintForm').reset(); // 清空表单
        } else {
            showFeedback('提交失败，请重试。', 'error');
        }
    })
    .catch(error => {
        console.error('提交投诉时出错:', error);
        showFeedback('网络错误，请检查网络连接后重试。', 'error');
    });
});

function showFeedback(message, type) {
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.textContent = message;
    feedbackDiv.className = `feedback ${type}`;
    feedbackDiv.classList.remove('hidden');

    // 3秒后隐藏反馈
    setTimeout(() => {
        feedbackDiv.classList.add('hidden');
    }, 3000);
}
