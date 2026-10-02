const courseData = {
  uuid: "724798a3-5a35-4465-b4c2-63ea4e4f576d",
  title: "Mathematical Foundations of Machine Learning",
  instructors: ["Prof. Prathosh A P"],
  institute: "IISc Bangalore",
  contentType: "Video",
  duration: "13 weeks",
  curriculum: [
    {
      week: 1,
      title: "Week 1 Introduction",
      lessons: [
        { id: 1, title: "Overview of Function Approximation", youtubeId: "G2h7nD_Stxg" },
        { id: 2, title: "Recap of Probability Theory - 1, Part 1", youtubeId: "YLx3hBqt28k" },
        { id: 3, title: "Recap of Probability Theory - 1, Part 2", youtubeId: "DaBw9qBpt2s" },
        { id: 4, title: "Recap of Probability Theory - 1, Part 3", youtubeId: "0R6Agp4tqSU" }
      ]
    },
    {
      week: 2,
      title: "Week 2 Setting Up the ML Problem",
      lessons: [
        { id: 5, title: "Recap of Probability Theory Part 2", youtubeId: "R69wew8RrPo" },
        { id: 6, title: "Understanding a Chest X-Ray  as Sample from Distribution", youtubeId: "bdcvsSNAHIk" },
        { id: 7, title: "IID Assumption", youtubeId: "C83xmx80tMo" },
        { id: 8, title: "Distribution Estimation", youtubeId: "aYb8KG9JYsg" },
        { id: 9, title: "Density Function", youtubeId: "_QrezNPmxDk" },
        { id: 10, title: "Challenge With ML", youtubeId: "767MLwniPKE" },
        { id: 11, title: "Tutorial 1 : Introduction to Python Basics", youtubeId: "cF025BechXo" },
        { id: 12, title: "Tutorial 2 : Simple Problem solving in Probability Theory", youtubeId: "nGwjqvLHguA" }
      ]
    },
    {
      week: 3,
      title: "Week 3 ERM and MLE",
      lessons: [
        { id: 13, title: "Entropy", youtubeId: "P6wjLz4dRTs" },
        { id: 14, title: "Kullback-Leibler (KL) Divergence", youtubeId: "ihkGbIdbbxc" },
        { id: 15, title: "Minimization of KL Divergence", youtubeId: "Ij4p5hLbfo4" },
        { id: 16, title: "Example of ML Estimate", youtubeId: "mEpXOyLwbxA" },
        { id: 17, title: "Risk Minimization Framework", youtubeId: "jXCqrFVGwoU" },
        { id: 18, title: "Bayes Classifier", youtubeId: "-y3SSAIhD4Y" },
        { id: 19, title: "Tutorial 3 : Risk Minimization Framework", youtubeId: "AQ3einJJrr0" }
      ]
    },
    {
      week: 4,
      title: "Week 4 MLE and EM",
      lessons: [
        { id: 20, title: "MLE for Gaussian Distribution", youtubeId: "tF-RrzUnnYA" },
        { id: 21, title: "MLE for Generalized Discrete Random Variable", youtubeId: "j7jbpicYdik" },
        { id: 22, title: "Density Estimation for Mixed Distribution", youtubeId: "3UmgTSDgG5Q" },
        { id: 23, title: "Latent Variable Models", youtubeId: "J9QNr4UrB2c" },
        { id: 24, title: "MLE for Latent Variable Models", youtubeId: "BMj-TWtK83A" },
        { id: 25, title: "Expectation Maximization Algorithm", youtubeId: "ejma0iH1pXE" },
        { id: 26, title: "Tutorial 4 : Minmax Classifier", youtubeId: "ENpzs2ycXJE" },
        { id: 27, title: "Tutorial 5 :  Neyman Pearson Classifier", youtubeId: "8esVIly2TZY" },
        { id: 28, title: "Tutorial 6 : Example of NP Classifier, ROC Curve", youtubeId: "JwQEaTqyBDw" },
        { id: 29, title: "Tutorial 7A : MLE for Gaussian Distribution", youtubeId: "XA3UiD8zEF8" },
        { id: 30, title: "Tutorial 7B : MLE for Generalized Discrete Distribution", youtubeId: "o5697P6KZoc" }
      ]
    },
    {
      week: 5,
      title: "Week 5 EM, MAP Estimates, Non Parametric Density Estimates",
      lessons: [
        { id: 31, title: "Convergence of EM", youtubeId: "zHchxrSwOu4" },
        { id: 32, title: "EM for GMMs", youtubeId: "TSNsiglfduQ" },
        { id: 33, title: "MAP Estimate", youtubeId: "HH9Xjjj7UN4" },
        { id: 34, title: "Parzen Window", youtubeId: "boCvzXvUVMI" },
        { id: 35, title: "Nearest Neighbor Classifier", youtubeId: "YZ3Xa6dEMl8" },
        { id: 36, title: "Tutorial 8 : Computation of EM for GMMs", youtubeId: "sOwgRt6uiA4" },
        { id: 37, title: "Tutorial 9 : MAP Estimate", youtubeId: "7y4V0GUoyaw" }
      ]
    },
    {
      week: 6,
      title: "Week 6 Linear Family of Models and Bias - Variance Analysis",
      lessons: [
        { id: 38, title: "Ordinary Least Squares (OLS)", youtubeId: "s_DfCCobgnA" },
        { id: 39, title: "Generalized Least Squares (GLS)", youtubeId: "UfiHgztGgu8" },
        { id: 40, title: "Linear Models for Classification", youtubeId: "EydAoMbslkc" },
        { id: 41, title: "Bias - Variance Decomposition and Analysis", youtubeId: "0RCDPOz3YVc" },
        { id: 42, title: "Bias & Variance in Practice", youtubeId: "E-kOTTO5hK8" },
        { id: 43, title: "Tutorial 10 Part A : Numerical Example on Bayes Classifier", youtubeId: "oTEPAiwv-00" },
        { id: 44, title: "Tutorial 10 Part B : Numerical Example on MLE and MAP Estimate", youtubeId: "ysjGmQW4HOo" }
      ]
    },
    {
      week: 7,
      title: "Week 7 Regularization , SVM",
      lessons: [
        { id: 45, title: "Regularization", youtubeId: "7F8pknXk_-o" },
        { id: 46, title: "Regularized ERM and MAP Estimate", youtubeId: "rypIu-ZSYBo" },
        { id: 47, title: "Stochastic Gradient Descent as a Regularizer", youtubeId: "vKTxP9FsR90" },
        { id: 48, title: "Max-Margin Classifier and SVM", youtubeId: "joL7g6DSxPU" },
        { id: 49, title: "SVM Formulation", youtubeId: "aO3FTnrf2bQ" }
      ]
    },
    {
      week: 8,
      title: "Week 8 SVM and Neural Networks",
      lessons: [
        { id: 50, title: "Dual Function in SVM", youtubeId: "RXzcClx44Tw" },
        { id: 51, title: "SVM for Non-Linear Seperable Case", youtubeId: "jQ-3gT8Mytw" },
        { id: 52, title: "SVM with Kernel Function", youtubeId: "dDIutyWTPKA" },
        { id: 53, title: "Neural Networks and Universal Approximation Theorem", youtubeId: "npYHSFuqnzs" },
        { id: 54, title: "ERM on Neural Networks and Error Backpropagation", youtubeId: "dONDRwX_83E" }
      ]
    },
    {
      week: 9,
      title: "Week 9 CNNs and RNNs",
      lessons: [
        { id: 55, title: "Local Receptive Field and Parameter Sharing", youtubeId: "rm0VmbTQE8Y" },
        { id: 56, title: "Convolutional Neural Networks(CNNs) as Regularized MLP", youtubeId: "mSYTyrXCsA8" },
        { id: 57, title: "Recurrent Neural Networks(RNNs)", youtubeId: "E2LLi7AB9lQ" },
        { id: 58, title: "Back Prapogation in RNNs and Vanishing Gradients Problem", youtubeId: "TVkaROL2FLw" },
        { id: 59, title: "LSTMs and GRUs", youtubeId: "Pkuwu4EMRj8" },
        { id: 60, title: "Tutorial 11 : Pytorch - Tensors and Data Loaders", youtubeId: "vm9FYVtM5ZA" },
        { id: 61, title: "Tutorial 12 : Pytorch - Building MLP and Auto Grad", youtubeId: "SEEQ2A2WN9g" },
        { id: 62, title: "Tutorial 13 : Pytorch - Training the Model", youtubeId: "5PruFG5g1C4" }
      ]
    },
    {
      week: 10,
      title: "Week 10 Transformers",
      lessons: [
        { id: 63, title: "Attention Part1", youtubeId: "00DOOSYFyJA" },
        { id: 64, title: "Attention Part2", youtubeId: "TGzZ8jCX4y0" },
        { id: 65, title: "Multi-Head Attention and Transformer Architecture", youtubeId: "NQyNZ6Plxzs" },
        { id: 66, title: "Positional Embeddings", youtubeId: "xbkJIeLoGyw" },
        { id: 67, title: "Transfer Learning and Knowledge Distilation", youtubeId: "5f2_TocU_CU" },
        { id: 68, title: "SGD, RMS Prop, ADAM : Optimizers", youtubeId: "N6F1J-wcE_E" },
        { id: 69, title: "Tutorial 14 Part 1 : CNNs", youtubeId: "0wd-LIzzfM0" },
        { id: 70, title: "Tutorial 14 Part 2 : Transfer Learning using CNNs", youtubeId: "vocN0cxAT7I" },
        { id: 71, title: "Tutorial 15 Part 1 : RNNs, LSTMs and GRUs", youtubeId: "zM5-TlrmKg8" },
        { id: 72, title: "Tutorial 15 Part 2 : Deep RNNs, LSTMs and GRUs", youtubeId: "nJivfX9VY7Y" }
      ]
    },
    {
      week: 11,
      title: "Week 11 Classification & Regression Trees",
      lessons: [
        { id: 73, title: "Decision Trees and Impurity Measures", youtubeId: "b2ScFHIhnB0" },
        { id: 74, title: "Regression Trees", youtubeId: "1GZDVRskXGE" },
        { id: 75, title: "Ensemble Methods, Bagging and Boosting", youtubeId: "2wyxSgVolJg" },
        { id: 76, title: "Gradient Boosting Algorithm", youtubeId: "_YKxmyP5PWU" }
      ]
    },
    {
      week: 12,
      title: "Week 12 Trees and Un-Supervised Learning",
      lessons: [
        { id: 77, title: "Ada-Boosting", youtubeId: "27cAa8L0JQo" },
        { id: 78, title: "Cross Validation", youtubeId: "R36BJ52Lr1A" },
        { id: 79, title: "Un-Supervised Learning", youtubeId: "5sg3d8ObcDc" },
        { id: 80, title: "K-Means Clustering", youtubeId: "oFr4JX75MCc" },
        { id: 81, title: "PCA - Principal Component Analysis", youtubeId: "BLYw-vf9q6U" }
      ]
    },
    {
      week: 13,
      title: "Week 13 Self-Supervised Learning and GAN",
      lessons: [
        { id: 82, title: "NCE - Noise Contrastive Estimation", youtubeId: "DHBl3E0ndRA" },
        { id: 83, title: "NCE, Info-NCE, SimCLR, JEPA", youtubeId: "vRX_5wwImec" },
        { id: 84, title: "Introduction to Generative Models", youtubeId: "hgZ3HOMkrx0" },
        { id: 85, title: "GAN - Generative Adversarial Networks", youtubeId: "nd3laZj5Cdg" }
      ]
    }
  ],
};

export default courseData;
