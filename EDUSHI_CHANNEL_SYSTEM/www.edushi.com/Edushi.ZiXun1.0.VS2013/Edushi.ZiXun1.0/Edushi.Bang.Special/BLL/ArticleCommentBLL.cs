�}R� r 9
  8�}�(����a	��� ��@�ƶ}�j�c-��PƋ۬�Cc�'�:7�s��Z�R(����9��Iw�q�ofpծʰ�"D��K�+Z/ˡ��ݜы�ٔ��<�����*��h�>�4�� �O�b��A���T��n5A�z���NTQ�z�{�̔�~JⲄ�c>5|F\t5��~�Q�VU��XMe)��渞�cl˖�����q��Lˁ�(4�M���EW%�"�y!s��
Wt ��H��Ir��dS�(�CY�i�b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�y>
        /// 增加一条数据
        /// </summary>
        public int Add(InfoArticleCommentModel model)
        {
            return dal.Add(model);
        }
        public int GetCommentCounts(int IAID)
        {
            return dal.GetCommentCounts(IAID);
        }
    }
}
