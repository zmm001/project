�}t� r �	  ���`�����a	��� ��px�<�t����\��L̷s�4(4\��O>1���
��/:h���C�7���h���L�iq��	��k�Y{�t/%Tp�
��Bp$�6���@�7E��،k������"�2�A��O����tk���u�,�n� �J�늡Q�J��L�ꁊ�,�`�S�zʝ����2�Mx@ݧ�03�Ŭ��s��/�
��(�n|�yZ�5Ŭ�*5IfQ����6�|�Ұ��(�$��.����-)��b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�
    public class CommentBaseModel
    {
        /// <summary>
        /// 评论信息
        /// </summary>
        public UserCommentModel CommentInfo { get; set; }

        /// <summary>
        /// 评论用户信息
        /// </summary>
        public Hashtable CommentUserInfo { get; set; }

        /// <summary>
        /// -2、已赞  -3、已踩  1、未赞或未踩
        /// </summary>
        public int IsUpvoteDownvote { get; set; }

    }
}