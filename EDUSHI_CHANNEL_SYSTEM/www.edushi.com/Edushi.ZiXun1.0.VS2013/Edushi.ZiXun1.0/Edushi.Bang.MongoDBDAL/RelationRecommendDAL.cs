�}X� r -
  .S=����a	���#_���}�����
�g1X�A�P(I��J.�dZ
|H��&D���C�9�u+Pl~�Gf՘.�N�#vl�G�0�R�`���3l��رE7"T���'��L��T2yLϙ���-�B�fp���Q��r�2�s����]k;c��4��f�Dd��Ů'q��t�C�ɮՌ�IT�<$���_�(j;}��*���8e��|�*ם�Ӕ����H`�}�}�&�P7ߓ$��j�!a�2'ϋ=��Y�gߌ��|鄹�|�2�Fy ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�'X��
�z4��Ą����|71��y����=ʍ���
#�@:�زA�f�A!�+���r4��������P�:�Z��M��,8�[әZ��Z#>���'��}7|��*�w�?����E�٣/���[�:����s{f}���w�H��w��e("��}��9s���ig�p�Ŭ)5]����wFo�q�sw0���m3��Rs*�^HK�ɒ�06���Ŀ��f�2�1�S��č���9\ׄ9/%���,�l���.f�v` *�I����$ʢ}�'���sI7�'�ٕ���bI<��T'o:t ��C�m&CM�$����:�7��j`}�v=����[� n1"[��nΎ�U�tq�W���d�&!%��2�jd��w�E)o���2}�O�����S���۱]ݬ
�(3�?ܱT�o�b.!�Ndt�I�gy�n���\�1�a����s�Ѵ`��,��p��Ël�T�$Ӳ{{���5p{�vbq��?�s��%���k1��<A�     {
                return new List<RelationRecommendModel>();
            }
            QueryDocument query = new QueryDocument();
            query.Add("RR_IA_ID", IA_ID);

            return _mongoCollection.FindAs<RelationRecommendModel>(query).SetSortOrder(sort).ToList();
        }
        #endregion
    }
}
