�}�� r /
  �QoP�:y���a	���#_��p|>�|���%�U�=���M>lmO�G�<;������D�f֯m؎�p�:�������u�;[)hɫ�d\���iVo�r�V�G��o��2���=v~0j��=C~��+ȩ΂�I�\f�W���P	9��ʗ�%	N��:@ׂ�.��Q��������ĕi���\� ���:�ȑ�Ơ�	3ťΊ>�K��:!��?��̃9.��"?+��X��v[Ko�.wzG~*�9�wW*�|(��E�������� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�-h���݇>I�a�gᷟes�$����?LL3^Ci��L��Ҭ��Dϫ;Gh�}��s������ˤ�h�Wz������Ul�����f�a�:h����P���5�"Y�����@����w����x��LD�t~�:Dъ�-�9�`Q�1��3��P��d*��>�?T
})� q�%�w%���8H�)����)�R��?8m/�W��DU�v�����;�q����<Å��` xM'�g�2��R|C�P˕q��<��r �f�G�gR��"�r[œ~�_!2����#fj;���]�/����cW-KUs��N�d#5�̔�FcJ#�5^&G�Vkڶ*~�D��M0p�c:�@���r�; ���Q�htf�Q}��ϙ���f�|��4�O�l�X��������:E�i�~��T�rX7<�o��G/��
!2zR]lI3�y*�1O� X;Ѫ%�q'�E^�TO�ܾ�#�����\"j��H���l�%�U��G�xe��K?���^�
��E]w��2�؈=��2b�梖8)h���r���%
��T��a�jF���.�8s)�`J�:�a�3�9�شc��^H�H��և^��C3�y����I��p��7D:�-�A�gX��߽f^���rr$D�_�76��U��n��[�zjX7V��<��C��W��Иx-Ru�r��A
��;j^DG)�|�����,��8`��b�����V��3�R|�~��Vz�a�~��Q&TaG|w� y=/��"Z�ۍ�V+�A易�D�
w��!�0�~��2�U��U�`�W�~���6���m��	A1��g���(A���Vp�yƋ��GE|�����/bxݷ��L�Z�-Wy>��~�u�H�@B�
-/1x��'��ψ�Y���?B����^@���SSM(lO%?���&:�3�f)������m�m#Lg56r��,�B��<p8�ﳣ|��_y�� ����Cv�x��vl�$�6k�c��!��ق9�����;asM���@�M��)�J��ײw^
u��*-z�k�͓A��)�ahFsvDP�������do�V�����Z�F�a�F���Ϧx���r���m��@�T0p�����IRT/��:N%Ӳ.�#�k�����=xol,����ɰ��k��z������m��d�����uD"<�`*~�����m�P��S�6(#�hE���L�B4�S#As�/�YX�#O�U�P�/y��ל�ʏ8�^����4`ץM8	�bYJ��4�+x �P�iM�sP�� VQ��xn�r���ܓ�E�	k$���UA��Fa8?�va���R����"Ჲ|C���!uRf�D���{�Tz��Q6"䍶�z�W;�[L�ʗ�vY�F'���\�b��~8c�g����ş�$8�r��ڏ�����v�7�e�W���7O(^���:Ro0���挅[�o�#_�-�'���+�dF�/���,9�}p����rlD#�Xk�l�?� ���̏!u��x/��2���N](���~v�vy��_�@[��B��~�Wَ�*��o�M�|��o��ӎ~����a��2���"_���R4礅�|�,o�%��ƲJ��$��]f��s/.�}B���Ұ�=Ӳ�/�>Ժ�ȥ�?vA��<d����)��W�ҴQ�����d�!�O>!P@3��*G���?���V(K:�}. 7(�Fq�]�'�b���e�~@�R짂���
�sO�0;5��y	�k'{'㋉�.N=k1Ц vU��H���t%�6���7���.X��I������+�
���Z��&)|,/���jIm�K��B&���\��T���A����X+�E�7�W�(���l���o7t��
�hT2\d`4k[�Ax3��?��HT�P�Jg4s�G~�.��]�WJ��n���vws"��*S���|4����]��D���bG����nH2�:��# 0�Q�i��O=��}����n�(D���8  if (topNum > 0)
            {
                return _mongoCollection.FindAs<TopicArticleModel>(query).SetSortOrder(sort).SetLimit(topNum).ToList();
            }
            else
            {
                return _mongoCollection.FindAs<TopicArticleModel>(query).SetSortOrder(sort).ToList();
            }
        }
        #endregion
    }
}
