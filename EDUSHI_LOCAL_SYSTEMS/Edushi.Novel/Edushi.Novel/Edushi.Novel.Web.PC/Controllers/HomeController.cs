�}O� r �   ;�y[������a	��� �#^���}���*2�#S��pܳ��6iD�*E�r8���569�OM^�?	�}$�ӱ���y��%.l�Y�e��hM2�f	��X�ߙ+�5�Y���h}�T���%e�I�`w�Ed�@�Q�8�Cn�*��lyOI��n(Fih�@���wO�ig��7�3;�~�n���:	��r�\k_y�>?#$%�{�:yK�"�"���ĬsԀ���r���8�r�I�l�wzL��66��CY�i�b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD�1��	��z�kR0����:�L�|Bv���S��z�z	����U������nv�d�"�)u�6y���o�f��y�M��f36��NH�R�������]����#~���g�W�@�Ǥ�mAU�G>DF|����͉���1ٜt)�ÓRd��7��p<G7"�����͚)�ɬr&��:���2U��?�����Ak^�����ie.l����B�	_׽D�)-�Xm�Ml���Va1��/�IjQ��t}����q?S$$
�Ǫp�,S�2��4�ݔv
�&�d���#J=����N���L\'�/'�.��X�*���H��:���GF�#�x9Iۤ+[/�y��1z��~Ft� z��(o��y\��ߩkת#�X���:��*g�{;���I�'�V��VB�5�l%a�6As�{M�`��
�����A�I�<\����'	��1U� �Jv-bK���qz�pD���]���So�*�U�了
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ContentResult IsLogin()
        {
            ContentResult cr = new ContentResult();

            int userId = UserCenter.GetUserId();
            if (userId <= 0)
            {
                cr.Content = "NO";
            }
            else
            {
                cr.Content = "OK";
            }

            return cr;
        }
        #endregion
    }
}
